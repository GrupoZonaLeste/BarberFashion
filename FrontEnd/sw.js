const CACHE_NAME = 'cache-v1';
//Salvando assets no cache
const urlsToCache = [
    "/",
    "images/barbas",
    "images/barbas/Barba-costeletafina.png",
    "images/barbas/Barba-extraGrande.png",
    "images/barbas/barba-grande.png",
    "images/barbas/Barba-media.png",
    "images/barbas/barba-rala-desenhada.png",
    "images/barbas/bigode-frances.png",
    "images/barbas/bigode-grosso-naorachado.png",
    "images/barbas/bigode-grosso-rachado.png",
    "images/barbas/cara-lisa.png",
    "images/barbas/cara-raspada.png",
    "images/cabelos",
    "images/agenda 1.png",
    "images/agenda.png",
    "images/barber.png",
    "images/carteira-de-identidade 1.png",
    "images/client 1.png",
    "images/dashboard-yellow.png",
    "images/employee 1.png",
    "images/estrela.png",
    "images/foto-barbearia-home.png",
    "images/foto-perfil1.png",
    "images/foto-perfil2.png",
    "images/good-feedback.png",
    "images/hair-cutting (1) 1.png",
    "images/icone_editar.png",
    "images/logo.png",
    "images/LogoMarca.png",
    "images/notebook.png",
    "images/penteado 1.png",
    "images/perfil-pessoal.png",
    "images/profile.png",
    "images/right-arrow-down.png",
    "images/right-arrow-white.png",
    "images/right-arrow.png",
    "images/sair-red.png",
    "images/schedule 1.png",
    "images/search-1wh.png",
    "images/search-wh.png",
    "images/search-yellow.png",
    "images/search-yellow2.png",
    "images/setting-wh.png",
    "images/smartphone (1) 1.png",
    "HTML/cliente/cadastro_cliente.html",
    "HTML/index.html",
    "CSS/cliente",
    "CSS/cliente/cadastro_cliente.css",
    "CSS/cliente/editar_cliente.css",
    "CSS/cliente/esqueceu_senha.css",
    "CSS/cliente/login_cliente.css",
    "CSS/cliente/pagina_cliente.css",
    "CSS/funcionario",
    "CSS/funcionario/editar_funcionario.css",
    "CSS/funcionario/pagina_funcionario.css",
    "CSS/gerente",
    "CSS/landing_page.css",
    "JS/app.js"
];

//instalando Service Worker/ Abrindo Cache e adicionando assets
self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});
//Atualiza service Worker / deleta cache antigo
self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
// Ativado quando requisições forem feitas
self.addEventListener('fetch', event => {

    const requestURL = new URL(event.request.url);
    const bypassCache = requestURL.pathname.includes('/BackEnd/pictures_clientes/');

    if (bypassCache) {
      // Always fetch from network for profile images
      event.respondWith(
        fetch(event.request).then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200) {
            throw new Error('Network response was not ok');
          }
          return networkResponse;
        }).catch(() => {
          // Return a default image if network fails
          return caches.match('/FrontEnd/images/profile.png').then(defaultResponse => {
            return defaultResponse || new Response('Offline', { status: 503 });
          });
        })
      );
    }
    
    route_client = requestURL.pathname.startsWith('/client/')
    route_manager = requestURL.pathname.startsWith('/manager/')
    route_employee = requestURL.pathname.startsWith('/employee/')
    route_schedule = requestURL.pathname.startsWith('/schedule/')
  // Check if the request is for Pokemon API
  if (
    requestURL.origin === 'http://localhost:8000' &&
    (route_client || route_manager || route_employee || route_schedule)
  ){
    // If it is, add JWT token to the request
    event.respondWith(
      (async () => {
        const token = await getTokenFromIndexedDB();
        const urlWithToken = new URL(event.request.url);
        urlWithToken.searchParams.append('token', token);

        const modifiedRequest = new Request(urlWithToken, {
          method: event.request.method,
          headers: event.request.headers,
          body: event.request.method !== 'GET' && event.request.method !== 'HEAD' ? await event.request.clone().blob() : null,
          mode: event.request.mode,
          credentials: event.request.credentials,
          cache: event.request.cache,
          redirect: event.request.redirect,
          referrer: event.request.referrer,
          referrerPolicy: event.request.referrerPolicy,
          integrity: event.request.integrity
        });

        try {
          // Fetch the modified request
          const networkResponse = await fetch(modifiedRequest);
          return networkResponse;
        } catch (error) {
          console.error('Network error:', error);
          // Respond with a custom offline page or a cached resource
          return caches.match(event.request).catch(() => new Response('Offline', { status: 503 }));
        }
      })()
    );
  } else {
    // For other requests, check cache first and then fetch from network
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          // Serve from cache if available
          return response;
        }
        // Fetch from network
        return fetch(event.request).then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          // Cache the response
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        });
      }).catch(() => {
        // Respond with offline page if fetch fails
        return caches.match('/Frontend/HTML/index.html').catch(() => new Response('Offline', { status: 503 }));
      })
    );
  }
});



async function getTokenFromIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("tokenDB", 1);

        request.onsuccess = (event) => {
            const db = event.target.result;
            const tokenStore = db.transaction("tokens", "readonly").objectStore("tokens");
            const getRequest = tokenStore.get("jwt_token");

            getRequest.onsuccess = () => {
                if (getRequest.result) {
                    resolve(getRequest.result.token);
                } else {
                    resolve(null);
                }
            };

            getRequest.onerror = () => {
                reject("Error fetching token from IndexedDB");
            };
        };

        request.onerror = () => {
            reject("Error opening IndexedDB");
        };
    });
}