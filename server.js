const http = require('http');
const { sportApi } = require('./index');

const betfair = new sportApi('betfair', { getCommonContents: false });

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  if (req.url === '/' || req.url === '') {
    res.writeHead(200);
    res.end(JSON.stringify({ 
      name: 'Radar Sport API', 
      status: 'running',
      endpoints: [
        '/api/test',
        '/api/league/:id',
        '/api/goals/:id',
        '/api/fixtures/:id'
      ]
    }));
    return;
  }
  
  if (req.url === '/api/test') {
    betfair.getInfo('Europe:Berlin', 'stats_season_meta', 76415)
      .then((data) => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      })
      .catch((err) => {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
      });
    return;
  }
  
  const leagueMatch = req.url.match(/^\/api\/league\/(\d+)$/);
  if (leagueMatch) {
    const id = leagueMatch[1];
    betfair.liague(id)
      .then((data) => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      })
      .catch((err) => {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
      });
    return;
  }
  
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Endpoint não encontrado' }));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
