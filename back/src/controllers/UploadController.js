import Upload from "../models/Upload.js"; 


function getUploads(req,res){
  Upload.findAll().then((uploads)=>{
    res.json(uploads);
  });
}

function getUploadsbyId(req,res){
  const {id} = req.params;
  Upload.findOne({where:{id}}).then((upload)=>{
    if (upload){
      res.json(upload);
    } else {
      res.status(404).json({error:"Upload non trouvé"});
    }
  })
}

async function createUpload(req, res) {
  try {
    const { title } = req.body;
    const videoFile = req.file; 

    if (!videoFile) {
      return res.status(400).json({ error: "Aucune vidéo envoyée" });
    }

    // Exemple : sauvegarde en base
    const newFilm = await Upload.create({
      title,
      user_id: req.user.id,          
      youtube_link: "",              
    });

    res.status(201).json({
      message: "Vidéo soumise avec succès",
      film: newFilm,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


  function updateUpload(req,res){
    const {id} = req.params



 function deleteUpload(req,res){
  const {id} = req.params;
  Upload.destroy({where:{id}}).then(()=>{
    res.status(204).json({message:"Uploads supprimé"});
  })
 }

export default { getUploads,getUploadsbyId, createUpload, deleteUpload };