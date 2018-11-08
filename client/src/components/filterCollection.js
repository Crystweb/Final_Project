import * as _ from 'lodash'

const filterCollection = (collection, keywords, matchAll, ...fields) => {
  if (_.isEmpty(collection) || _.isEmpty(keywords) || _.isEmpty(fields)) {
    return collection || []
  }

  if (matchAll) {
    return collection.filter(item => keywords.split(' ').every(keyword => fields.some(field => fieldMatches(item, field, keyword))))
  } else {
    return collection.filter(item => keywords.split(' ').some(keyword => fields.some(field => fieldMatches(item, field, keyword))))
  }
}

export const displayDate = (dateString) => {
  let date = new Date(dateString);
  return date.toDateString() + ' ' + date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
}


const fieldMatches = (item, field, keyword) => {
  const fieldParts = field.split('.')
  return searchInsideItem(item, fieldParts, keyword)
}

const searchInsideItem = (item, fieldParts, keyword) => {
  const currentField = fieldParts[0]

  if (!item.hasOwnProperty(currentField)) {
    return false
  }

  if (fieldParts.length === 1) {
    if (Array.isArray(item[currentField])) {
      return item[currentField].some(arrayItem => arrayItem && arrayItem.toString().toLowerCase().indexOf(keyword) !== -1)
    } else {
      return item[currentField] && item[currentField].toString().toLowerCase().indexOf(keyword) !== -1
    }
  } else {
    const nextLevelItem = item[currentField]
    const remainingFieldParts = fieldParts.slice(1, fieldParts.length)

    if (Array.isArray(nextLevelItem)) {
      return nextLevelItem.some(arrayItem => searchInsideItem(arrayItem, remainingFieldParts, keyword))
    } else {
      return searchInsideItem(nextLevelItem, remainingFieldParts, keyword)
    }
  }
}

export default filterCollection