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
    camera.position.set( 0, 0, 1 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [

	[-1, 1, 0], // v0

	[-1,-1, 0], // v1
	
	[ 1,-1, 0], // v2
	
	[ 1, 1, 0], // v3
	
	[-1, 1, 2], // v4
	
	[-1,-1, 2], // v5
	
	[ 1,-1, 2], // v6
	
	[ 1, 1, 2], // v7
	
	
    ];
    
    var faces = [ 
	[0,2,1],
	[0,3,2],
	[4,0,1],
	[4,1,5],
	[5,1,2],
	[5,2,6],
	[6,2,3],
	[6,3,7],
	[7,3,0],
	[7,0,4],
	[4,5,6],
	[4,6,7]
    ];
    

   var geometry =  new THREE.Geometry();
     
    for(i=0;i<8;i++){
	var v = new THREE.Vector3().fromArray(vertices[i]);
	geometry.vertices.push(v);
    }    
       
    for(i=0;i<12;i++){
	var id = faces[i]
	var f = new THREE.Face3(id[0],id[1],id[2]);
	geometry.faces.push(f);
    }
   

    var material = new THREE.MeshLambertMaterial();
    material.vertexColors = THREE.FaceColors;
    geometry.faces[0].color= new THREE.Color(1,0,0);
    geometry.faces[1].color= new THREE.Color(0,1,0);
    geometry.faces[2].color= new THREE.Color(0,0,1);
    geometry.faces[3].color= new THREE.Color(1,1,0);
    geometry.faces[4].color= new THREE.Color(1,0,1);
    geometry.faces[5].color= new THREE.Color(0,1,1);
    geometry.faces[6].color= new THREE.Color(1,1,1);
    geometry.faces[7].color= new THREE.Color(1,0,0);
    geometry.faces[8].color= new THREE.Color(0,1,0);
    geometry.faces[9].color= new THREE.Color(0,0,1);
    geometry.faces[10].color= new THREE.Color(1,0,1);
    geometry.faces[11].color= new THREE.Color(1,1,0);
    geometry.computeFaceNormals();
    
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );    
    
    var light = new THREE.PointLight( 0xffffff);
    light.position.set(1,1,5);
    scene.add(light);
   
   
    loop();
    
    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.1;
	cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
}
