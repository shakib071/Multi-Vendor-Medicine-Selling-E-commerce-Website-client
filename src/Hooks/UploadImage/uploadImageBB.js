
 const uploadImageBB = async (photo) => {
  const imgBBApi = import.meta.env.VITE_ImgBB_API;
  const formData = new FormData();
  formData.append("image", photo);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgBBApi}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.data.url; 
};

export default uploadImageBB;