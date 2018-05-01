import R from 'ramda'

// INPUT: [{ordering: 2, name: 'b'}, {ordering: 1, name: 'a'}]
// OUTPUT: [{ordering: 1, name: 'a'}, {ordering: 2, name: 'b'}]
export const sortObjectsByKeyAtoZ = (datas, fieldName, offset, limit) => R.pipe(
  R.values,
  R.sortBy(R.prop(fieldName)),
  R.slice(offset * limit, limit * (offset + 1))
)(datas)

export const sortObjectsByKeyZtoA = (datas, fieldName, offset, limit) => R.reverse(sortObjectsByKeyAtoZ(datas, fieldName, offset, limit))

export const priceToString = price => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VNĐ'

export const searchProduct = (keyword, items) => R.pipe(
  R.filter(item => checkKeyword(keyword, item))
)(items)

export const checkKeyword = (keyword, item) => vietnameseToAlias(item.name).includes(vietnameseToAlias(keyword))

const vietnameseToAlias = (alias) => {
  if (!alias) return ''
  let str = alias
  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  return str
}
