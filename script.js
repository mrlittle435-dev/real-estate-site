// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// ==================== GLOBAL VARIABLES ====================
const properties = [
  { id: 'property-1', color: 0xD97706 },
  { id: 'property-2', color: 0x64748B },
  { id: 'property-3', color: 0xB45309 },
  { id: 'property-4', color: 0x475569 }
];

const scenes = {};
const cameras = {};
const renderers = {};
const geometries = {};
const meshes = {};

// ==================== 3D SCENE SETUP ====================
function init3DScene(canvasElement, propertyId, color) {
  const width = canvasElement.clientWidth;
  const height = canvasElement.clientHeight;

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // Camera
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvasElement });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(color, 1);
  pointLight.position.set(-5, 5, 5);
  scene.add(pointLight);

  // Create 3D Geometric Shape (Rotating Cube with Material)
  const geometry = new THREE.IcosahedronGeometry(1.5, 4);
  const material = new THREE.MeshPhongMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: 0.3,
    shininess: 100,
    wireframe: false
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.random() * Math.PI;
  mesh.rotation.y = Math.random() * Math.PI;
  scene.add(mesh);

  // Store references
  scenes[propertyId] = scene;
  cameras[propertyId] = camera;
  renderers[propertyId] = renderer;
  geometries[propertyId] = geometry;
  meshes[propertyId] = mesh;

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.002;
    mesh.rotation.y += 0.003;
    renderer.render(scene, camera);
  }
  animate();

  // Handle resize
  window.addEventListener('resize', () => {
    const newWidth = canvasElement.clientWidth;
    const newHeight = canvasElement.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
}

// ==================== HERO 3D BACKGROUND ====================
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  const width = window.innerWidth;
  const height = window.innerHeight;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0x000000, 15, 100);

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xfbbf24, 0.3);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xd97706, 0.8);
  directionalLight.position.set(10, 10, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Create multiple geometric shapes for background
  const shapes = [];
  for (let i = 0; i < 8; i++) {
    const geometry = new THREE.IcosahedronGeometry(Math.random() * 1.5 + 0.5, 3);
    const material = new THREE.MeshPhongMaterial({
      color: 0xd97706,
      emissive: 0xb45309,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.3 + Math.random() * 0.3
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 30
    );
    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    scene.add(mesh);
    shapes.push({
      mesh: mesh,
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.002,
        y: (Math.random() - 0.5) * 0.002,
        z: (Math.random() - 0.5) * 0.002
      }
    });
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    shapes.forEach(shape => {
      shape.mesh.rotation.x += shape.rotationSpeed.x;
      shape.mesh.rotation.y += shape.rotationSpeed.y;
      shape.mesh.rotation.z += shape.rotationSpeed.z;
    });
    renderer.render(scene, camera);
  }
  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
}

// ==================== ABOUT CANVAS 3D ====================
function initAboutCanvas() {
  const canvas = document.getElementById('about-canvas');
  if (!canvas) return;

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 3;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xfbbf24, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xd97706, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Create animated torus
  const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
  const material = new THREE.MeshPhongMaterial({
    color: 0xd97706,
    emissive: 0xb45309,
    emissiveIntensity: 0.5,
    shininess: 100
  });
  const torus = new THREE.Mesh(geometry, material);
  scene.add(torus);

  // Create inner rotating cube
  const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const cubeMaterial = new THREE.MeshPhongMaterial({
    color: 0xfbbf24,
    emissive: 0xd97706,
    emissiveIntensity: 0.4
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  scene.add(cube);

  // Animation
  function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.002;
    torus.rotation.y += 0.003;
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.004;
    cube.rotation.z += 0.003;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const newWidth = canvas.clientWidth;
    const newHeight = canvas.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
}

// ==================== GSAP ANIMATIONS ====================
function initScrollAnimations() {
  // Animate section titles
  gsap.utils.toArray('.section-title').forEach(element => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        markers: false
      },
      duration: 0.8,
      opacity: 0,
      y: 30
    });
  });

  // Animate stat cards
  gsap.utils.toArray('.stat-card').forEach((element, index) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%'
      },
      duration: 0.6,
      opacity: 0,
      y: 40,
      delay: index * 0.1
    });
  });

  // Animate property cards
  gsap.utils.toArray('.property-card').forEach((element, index) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%'
      },
      duration: 0.8,
      opacity: 0,
      y: 50,
      rotation: 3,
      delay: index * 0.15
    });
  });

  // Animate about section
  gsap.from('.about-image', {
    scrollTrigger: {
      trigger: '.about-image',
      start: 'top 80%'
    },
    duration: 0.8,
    opacity: 0,
    x: -50
  });

  gsap.from('.about-text', {
    scrollTrigger: {
      trigger: '.about-text',
      start: 'top 80%'
    },
    duration: 0.8,
    opacity: 0,
    x: 50,
    delay: 0.2
  });

  // Animate feature items
  gsap.utils.toArray('.feature-item').forEach((element, index) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 90%'
      },
      duration: 0.6,
      opacity: 0,
      x: -30,
      delay: index * 0.1
    });
  });
}

// ==================== COUNTER ANIMATION ====================
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let hasStarted = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasStarted) {
        hasStarted = true;
        counters.forEach(counter => {
          const target = parseInt(counter.dataset.target);
          gsap.to(counter, {
            textContent: target,
            duration: 2.5,
            ease: 'power2.out',
            snap: { textContent: 1 }
          });
        });
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// ==================== SWIPER CAROUSEL ====================
function initSwiper() {
  const swiper = new Swiper('.propertySwiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40
      }
    },
    navigation: {
      nextEl: '.swiper-button-next-custom',
      prevEl: '.swiper-button-prev-custom'
    },
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    speed: 800
  });

  return swiper;
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
  gsap.registerPlugin(ScrollTrigger);
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: target,
          ease: 'power2.inOut'
        });
      }
    });
  });
}

// ==================== FORM HANDLING ====================
function initFormHandling() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    
    // Visual feedback
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      button.textContent = 'Message Sent!';
      gsap.to(form, { duration: 0.5, opacity: 0.7 });
      
      setTimeout(() => {
        form.reset();
        button.textContent = originalText;
        button.disabled = false;
        gsap.to(form, { duration: 0.5, opacity: 1 });
      }, 2000);
    }, 1500);
  });
}

// ==================== PARALLAX EFFECT ====================
function initParallax() {
  gsap.utils.toArray('section').forEach(section => {
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        scrub: true,
        start: 'top center',
        end: 'bottom center'
      },
      duration: 1,
      y: -50,
      opacity: 1
    });
  });
}

// ==================== MOUSE TRACKING ====================
function initMouseTracking() {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    gsap.to('.hero-section', {
      duration: 0.5,
      backgroundPosition: `${x}% ${y}%`,
      overwrite: 'auto'
    });
  });
}

// ==================== INITIALIZATION ====================
function initialize() {
  console.log('Initializing Luxe Properties Website...');
  
  // Initialize 3D scenes
  initHeroCanvas();
  initAboutCanvas();
  
  // Initialize property cards 3D
  properties.forEach(prop => {
    const canvas = document.querySelector(`canvas[data-id="${prop.id}"]`);
    if (canvas) {
      init3DScene(canvas, prop.id, prop.color);
    }
  });
  
  // Initialize interactions
  initSwiper();
  initScrollAnimations();
  initCounters();
  initSmoothScroll();
  initFormHandling();
  initMouseTracking();
  
  console.log('Luxe Properties Website Initialized!');
}

// ==================== DOM READY ====================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

// ==================== HANDLE VISIBILITY CHANGE ====================
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    Object.values(renderers).forEach(renderer => renderer.setAnimationLoop(null));
  } else {
    Object.entries(scenes).forEach(([id, scene]) => {
      const renderer = renderers[id];
      const camera = cameras[id];
      const mesh = meshes[id];
      
      function animate() {
        requestAnimationFrame(animate);
        if (mesh) {
          mesh.rotation.x += 0.002;
          mesh.rotation.y += 0.003;
        }
        renderer.render(scene, camera);
      }
      animate();
    });
  }
});

// ==================== PERFORMANCE OPTIMIZATION ====================
window.addEventListener('resize', () => {
  Object.entries(renderers).forEach(([id, renderer]) => {
    const camera = cameras[id];
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    
    if (camera.aspect !== width / height) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    }
  });
});