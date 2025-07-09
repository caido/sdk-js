export type EnvironmentVariable = {
    /**
     * The name of the environment variable.
     */
    name: string;
    /**
     * The value of the environment variable.
     */
    value: string;
    /**
     * Whether the environment variable is a secret.
     */
    isSecret: boolean;
};
