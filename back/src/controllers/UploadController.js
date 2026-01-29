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

function createUpload(req, res) {
  if (!req.body) {
    return res.status(400).json({ error: "Données manquantes" });
  }

  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  Video.findOne({ where: { title } }).then((video) => {
    if (video) {
      res.json(video);
    } else {
      Video.create({ title: title, description: description }).then(
        (newVideo) => {
          res.status(201).json(newVideo);
        },
      );
    }
  });
}


  function updateUpload(req,res){
    const {id} = req.params
  }


 function deleteUpload(req,res){
  const {id} = req.params;
  Upload.destroy({where:{id}}).then(()=>{
    res.status(204).json({message:"Uploads supprimé"});
  })
 }


export default { getUploads,getUploadsbyId, createUpload, deleteUpload };