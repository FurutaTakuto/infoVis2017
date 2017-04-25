function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.Geometry( 1, 1, 1 );
    var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    var light = new THREE.PointLight( 0xffffff );

    light.position.set( 1, 1, 1 );

    scene.add( light );
}

