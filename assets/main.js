(() => {
    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();

    // Camera settings

    const camera = new THREE.PerspectiveCamera(45,SCREEN_WIDTH/SCREEN_HEIGHT,0.1,1000);
    camera.position.x = -10;
    camera.position.y = 10;
    camera.position.z = 100;
    camera.lookAt(scene.position);

    // Light settings

    const light = new THREE.HemisphereLight( 0x14daec, 0x309ba4, 0.6 );
    light.position.set( 1, 1, 1 ).normalize();
    scene.add(light);

    const directionalLightL = new THREE.DirectionalLight(0xffffff, 1, 0);
    directionalLightL.position.set(40, 30, 10);
    directionalLightL.intensity = 0.7;
    scene.add(directionalLightL);
    
    // CREAMOS PROPIEDADES DE ESFERA

    const sphereGeometry = new THREE.SphereGeometry(4,20,20);
    const sphereMaterial = new THREE.MeshLambertMaterial({color:0xafe5ea});
    const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
    sphere.castShadow = true;

    for(let i = 0; i < 200; i++){
        let tempSphere = sphere.clone();
        tempSphere.position.x = Math.floor(Math.random()*101) -70 * i / 25;
        tempSphere.position.y = Math.floor(Math.random()*101) -50;
        tempSphere.position.z = Math.floor(Math.random()*101) -50;
        scene.add(tempSphere);
    }

    // Render settings

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x2d8489);
    renderer.setSize(SCREEN_WIDTH,SCREEN_HEIGHT);
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera,renderer.domElement);
    controls.autoRotate = true;
    container.appendChild(renderer.domElement);

    const render = () => {
        controls.update();
        renderer.render(scene,camera);
        requestAnimationFrame(render);
    }

    render();
})();
