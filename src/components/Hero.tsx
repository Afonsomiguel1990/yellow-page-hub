export const Hero = () => (
  <div className="sticky top-0 z-50 bg-yellow-100 shadow-md">
    <div className="max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold text-yellow-900 mb-2">
        Lista Empresas Abrantes
      </h1>
      <p className="text-yellow-800 text-lg mb-4">
        Encontra os profissionais que precisas aqui
      </p>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-200">
        <iframe 
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61555182875701&tabs=timeline&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
          width="340" 
          height="130" 
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no" 
          frameBorder="0" 
          allowFullScreen={true} 
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </div>
    </div>
  </div>
);