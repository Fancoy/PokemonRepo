/** @type {import('next').NextConfig} */
const nextConfig = {
   async rewrites() {
       return [
           {
               source: '/api/pokemon',
               destination: 'https://it2y9tcb7a.execute-api.eu-west-2.amazonaws.com',
           },
           {
               source: '/api/pokemon/:id',
               destination: 'https://it2y9tcb7a.execute-api.eu-west-2.amazonaws.com',
           },
       ];
   }
};


export default nextConfig;
