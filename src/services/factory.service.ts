import {
  Model,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
  Document,
} from 'mongoose';
import { UpdateOptions } from 'mongodb';

// Find all documents
export async function findAllDocs<T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T> = {},
  projection?: any,
  options?: QueryOptions,
): Promise<T[]> {
  return model.find(filter, projection, options).exec();
}

// Find one document
export async function findOneDoc<T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T>,
  projection?: any,
  options?: QueryOptions,
): Promise<T | null> {
  return model.findOne(filter, projection, options).exec();
}

// Find by ID
export async function findByIdDoc<T extends Document>(
  model: Model<T>,
  id: string,
  projection?: any,
  options?: QueryOptions,
): Promise<T | null> {
  return model.findById(id, projection, options).exec();
}

// Create one document
export async function createOneDoc<T extends Document>(
  model: Model<T>,
  data: Partial<T>,
): Promise<T> {
  return model.create(data);
}

// Update one document
export async function updateOneDoc<T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T>,
  update: UpdateQuery<T>,
  projection?: any,
  options?: QueryOptions,
): Promise<T | null> {
  return model
    .findOneAndUpdate(filter, update, { new: true, ...options })
    .select(projection || {})
    .exec();
}

export const updateManyDocs = async <T>(
  model: Model<T>,
  filter: FilterQuery<T>,
  update: UpdateQuery<T>,
  options?: UpdateOptions & QueryOptions,
) => {
  return await model.updateMany(filter, update, options).exec();
};
// Upsert one document (update if exists, otherwise insert)
export async function upsertOneDoc<T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T>,
  update: UpdateQuery<T>,
  projection?: any,
  options?: QueryOptions,
): Promise<T | null> {
  return model
    .findOneAndUpdate(filter, update, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      ...options,
    })
    .select(projection || {})
    .exec();
}

// Delete by ID
export const deleteById = async <T>(
  model: Model<T>,
  id: string,
  projection?: any,
) => {
  return await model.findByIdAndDelete(id).select(projection || {});
};

// Delete one document
export async function deleteOneDoc<T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T>,
  projection?: any,
  options?: QueryOptions,
): Promise<T | null> {
  return model
    .findOneAndDelete(filter, options)
    .select(projection || {})
    .exec();
}

// Delete many documents
export async function deleteManyDocs<T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T>,
  projection?: any,
  options?: QueryOptions,
): Promise<{ deletedCount?: number }> {
  return model.deleteMany(filter).exec();
}
