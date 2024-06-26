import fs from "fs";
import path from "path";

export const sanitizeString = (str: string) => {
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
  return str.trim();
};

export const replaceTemplateVariables = (
  template: string,
  variables: { [key: string]: string }
): string => {
  let templateText = template;
  Object.keys(variables).map((key) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    const sanitizedValue = sanitizeString(String(variables[key]));
    templateText = templateText.replace(regex, sanitizedValue);
  }, template);
  return templateText;
};

export const loadTemplate = (filePath?: string) => {
  const filePathInt = path.join(
    process.cwd(),
    filePath || "src/templates/test.md"
  );
  const fileContent = fs.readFileSync(filePathInt, "utf8");
  return fileContent;
};

// Function to load the markdown file and apply variable values
export const buildPrompt = (
  variables: { [key: string]: string },
  templatePath?: string
): string => {
  const rawTemplate = loadTemplate(templatePath);
  return replaceTemplateVariables(rawTemplate, variables);
};
