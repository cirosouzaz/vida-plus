const axios = require('axios');

async function lookup(req, res, next) {
  try {
    const cep = req.params.cep.replace(/\D/g, '');
    const resp = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (resp.data && resp.data.erro) return res.status(404).json({ message: 'CEP not found' });
    const { logradouro: street, bairro: neighborhood, localidade: city, uf: state } = resp.data;
    res.json({ street, neighborhood, city, state });
  } catch (err) { next(err); }
}

module.exports = { lookup };
