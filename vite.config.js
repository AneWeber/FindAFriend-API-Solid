import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    workspace: [
      {
        extends: true,
        test: {
          dir: 'src/http/controllers',
          name: 'e2e',
          environment: './prisma/vitest-environment-prisma/prisma-test-environment.ts',
        },
      },
      {
        extends: true,
        test: {
          dir: 'src/use-cases',
          environment: 'node',
          name: 'unit',
        },
      },
    ],
  },
})