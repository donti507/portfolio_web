import ts from 'typescript';
import type { Plugin } from 'vite';

const sources = new Map([
  ['/src/data/projects.ts', 'projects'],
  ['/src/data/site.ts', 'experience'],
]);

export function publishedContent(): Plugin {
  return {
    name: 'published-content',
    enforce: 'pre',
    transform(code, id) {
      const source = [...sources].find(([path]) => id.endsWith(path));
      if (!source) return;
      const file = ts.createSourceFile(id, code, ts.ScriptTarget.Latest, true);
      const declaration = file.statements.filter(ts.isVariableStatement)
        .flatMap(statement => [...statement.declarationList.declarations])
        .find(item => ts.isIdentifier(item.name) && item.name.text === source[1]);
      const array = declaration?.initializer;
      if (!array || !ts.isArrayLiteralExpression(array)) {
        this.error(`Expected an array literal for ${source[1]} in ${id}`);
      }
      const published = array.elements.filter(entry => !ts.isObjectLiteralExpression(entry) ||
        !entry.properties.some(property => ts.isPropertyAssignment(property) &&
          (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) &&
          property.name.text === 'verify' && property.initializer.kind === ts.SyntaxKind.TrueKeyword));
      const replacement = published.map(entry => entry.getText(file)).join(',\n  ');
      return {
        code: code.slice(0, array.getStart(file)) + '[\n  ' + replacement + '\n]' + code.slice(array.end),
        map: null,
      };
    },
  };
}
