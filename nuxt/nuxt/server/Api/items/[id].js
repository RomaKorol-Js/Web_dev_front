export default defineEventHandler(async (event) => {
  const itemId = getRouterParam(event, 'id');
  const data = await $fetch(`/api/items`);
  const item = data.find((item) => item.id === parseInt(itemId));
  return item;
});
