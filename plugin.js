export async function entryPoint({ addAction }) {
  addAction({
    id: 'tmdb-toggle-adult',
    name: 'Toggle TMDb Adult',
    description: 'Enable TMDb adult content setting',
    onPress: async () => {
      console.log('Adult content toggled');
    }
  });
}
