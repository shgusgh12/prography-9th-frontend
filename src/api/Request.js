export const GetRequest = async () => {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/categories.php',
    {
      method: 'GET',
    }
  );
  if (!response.ok) throw new Error(`GET Request Failed`);
  return response.json();
};
