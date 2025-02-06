import { type SchemaTypeDefinition } from 'sanity'


import {categoryType} from './categoryType'

import { saleType } from './saleType'
import { productType } from './ProductType'
import { orderType } from './orderType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType,saleType , productType , orderType],
}
