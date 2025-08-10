interface EnvConfig {
  VITE_BACKEND_URL: string;
}

const loadEnvVars = (): EnvConfig => {
  const requiredEnvVars: string[] = ["VITE_BACKEND_URL"];

  requiredEnvVars.forEach((key) => {
    if (!import.meta.env[key]) {
      throw new Error(`Missing require Env Variable ${key}`);
    }
  });

  return {
    VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL as string,
  };
};

export const envVars = loadEnvVars();
