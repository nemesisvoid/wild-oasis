import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('error loading cabins');
  }

  console.log(data);
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('error deleting cabin');
  }
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.floor(Math.random() * 1000) + 1}-${newCabin.image.name}`.replaceAll('/', '');

  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // create/edit cabin
  let query = supabase.from('cabins');

  // create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  console.log(newCabin.image);
  console.log(newCabin.imagePath);

  // edit cabin
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error('error creating cabin');
  }

  // upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data[0].id);
    console.error(storageError);
    throw new Error('error uploading image');
  }

  return data;
}

export default getCabins;
