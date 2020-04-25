import http from '@/middlewares/http'
const getMenuList = async () => {
  return await http.get('/menus')
}
export { getMenuList }
