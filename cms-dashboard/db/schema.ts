import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, integer, decimal, boolean, json, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from 'drizzle-zod';

export const productTypeEnum = pgEnum('product_type', ['sale', 'rental', 'both']);
export const rentalStatusEnum = pgEnum('rental_status', ['available', 'rented', 'under maintenance']);
export const rentalConditionEnum = pgEnum('rental_condition', ['new', 'used', 'refurbished']);

export const stores = pgTable('stores', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    userId: text('user_id').notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export const insertStoreSchema = createInsertSchema(stores);

export const products = pgTable('products', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    categoryId: text('category_id').notNull(),
    price: decimal('price').notNull(),
    quantity: integer('quantity').notNull(),
    productType: productTypeEnum('product_type').notNull(),
    imageUrl: text('image_url'),
    isActive: boolean('is_active'),
    inventoryDetails: json('inventory_details').notNull(),
    rentalDetails: json('rental_details'),
});

// export const productRelations = relations(products, ({ many }) => ({

// }))

export const insertProductSchema = createInsertSchema(products);

// export const categories = pgTable('categegories',  {
//     categoryId: text('category_id').primaryKey(),
//     name: text('name').notNull(),
//     description: text('description'),
//     parentId: text('parent_id'),
//     subcategories: json('subcategories')
// });

// export const categoryRelations = relations(categories, ({ many }) => ({
//     products: many(products)
// }));

// export const insertCategorySchema = createInsertSchema(categories);

// export const rentals = pgTable('rentals', {
//     rentalId: text('rentalId').primaryKey(),
//     productId: text('product_id').references(() => products.id),
//     customerId: text('customer_id').unique().notNull(),
//     rentalStartDate: timestamp('rental_start_date', { mode: 'date' }).notNull(),
//     rentalEndDate: timestamp('rental_end_date', { mode: 'date' }).notNull(),
//     rentalDurationDays: integer('rental_duration_days').notNull(),
//     rentalPricePerDay: integer('rental_price_per_day').notNull(),
//     totalRentalCost: integer('total_rental_cost').notNull(),
//     rentalDeposit: integer('rental_deposit'),
//     rentalStatus: rentalStatusEnum('rental_status').notNull(),
//     rentalReturnDate: timestamp('rental_return_date', { mode: 'date' }),
//     rentalConditionAtReturn: rentalConditionEnum('rental_condition_at_return'),
// });

// export const rentalRelations = relations(rentals, ({}) => ({

// }))