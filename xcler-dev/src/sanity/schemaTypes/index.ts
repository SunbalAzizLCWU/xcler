import { type SchemaTypeDefinition } from 'sanity'
import {blogPost} from './blogPost'
import {priceChart} from './priceChart'
import {pricingPlan} from './pricingPlan'
import {richTable} from './richTable'
import {teamMember} from './teamMember'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [teamMember, pricingPlan, priceChart, richTable, blogPost],
}
