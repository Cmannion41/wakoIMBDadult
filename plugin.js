export async function entryPoint({ addAction }) {
  addAction({
    id: 'test-action',
    name: 'Say Hello',
    description: 'Click to log a message',
    onPress: async () => {
      console.log('Hello from Wako plugin!');
    }
  });
}
