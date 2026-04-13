import { type SchemaTypeDefinition } from 'sanity'
import {blogPost} from './blogPost'
import {pricingPlan} from './pricingPlan'
import {teamMember} from './teamMember'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [teamMember, pricingPlan, blogPost],
}
