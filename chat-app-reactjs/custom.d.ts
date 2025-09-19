// custom.d.ts
declare module '*.json' {
  const value: {
    name: string;
    version: string;
    cometChatCustomConfig?: {
      name?: string;
      version?: string;
    };
  };
  export default value;
}
