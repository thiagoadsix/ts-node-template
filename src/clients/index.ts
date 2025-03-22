export interface ExampleClient {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

export interface Clients {
  example: ExampleClient;
}

const createExampleClient = (): ExampleClient => {
  return {
    connect: async () => {
      console.log('Example client connected');
    },
    disconnect: async () => {
      console.log('Example client disconnected');
    }
  };
};

export function setupClients(): Clients {
  const exampleClient = createExampleClient();

  return {
    example: exampleClient
  };
}