import js from '@eslint/js';
import ts from 'typescript-eslint';
export default ts.config({ignores:['.next/**','node_modules/**','next-env.d.ts']}, js.configs.recommended, ...ts.configs.recommended);
