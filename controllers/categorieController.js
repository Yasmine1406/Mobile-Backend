// controllers/categorieController.js
const categories = [
    { idCategorie: '1', nomCategorie: 'Viennoiserie' },
    { idCategorie: '2', nomCategorie: 'Boulangerie' },
    { idCategorie: '3', nomCategorie: 'Fruits/Légumes' },
    { idCategorie: '4', nomCategorie: 'Traiteur' },
    { idCategorie: '5', nomCategorie: 'FastFood' },
  ];
  
  exports.getCategories = (req, res) => {
    res.json(categories);
  };
  
  exports.getCategorieById = (req, res) => {
    const idCategorie = req.params.id;
    const categorie = categories.find((c) => c.idCategorie === idCategorie);
  
    if (categorie) {
      res.json(categorie);
    } else {
      res.status(404).json({ error: 'Categorie not found' });
    }
  };