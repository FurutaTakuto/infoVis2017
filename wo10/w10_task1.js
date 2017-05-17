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

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
        [ -1,  1, 0 ], // 0
        [ -1, -1, 0 ], // 1
        [  1, -1, 0 ]  // 2
    ];

    var faces = [
        [ 0, 1, 2 ], // f0
    ];

    var scalars = [
        0,   // S0
        128, // S1
        255  // S2
    ];

    // Create color map
    var cmap = [];
    for ( var i = 0; i < 256; i++ )
    {
        var S = i / 255.0; // [0,1]
        var R = Math.max( Math.cos( ( S - 1.0 ) * Math.PI ), 0.0 );
        var G = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
        var B = Math.max( Math.cos( S * Math.PI ), 0.0 );
        var color = new THREE.Color( R, G, B );
        cmap.push( [ S, '0x' + color.getHexString() ] );
    }

    // Draw color map
    var lut = new THREE.Lut( 'rainbow', cmap.length );
    lut.addColorMap( 'mycolormap', cmap );
    lut.changeColorMap( 'mycolormap' );
    scene.add( lut.setLegendOn( {
        'layout':'horizontal',
        'position': { 'x': 0.6, 'y': -1.1, 'z': 2 },
        'dimensions': { 'width': 0.15, 'height': 1.2 }
    } ) );

    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial();

    var nvertices = vertices.length;
    for ( var i = 0; i < nvertices; i++ )
    {
        var vertex = new THREE.Vector3().fromArray( vertices[i] );
        geometry.vertices.push( vertex );
    }

    var nfaces = faces.length;
    for ( var i = 0; i < nfaces; i++ )
    {
        var id = faces[i];
        var face = new THREE.Face3( id[0], id[1], id[2] );
        geometry.faces.push( face );
    }

  function lerp(x0,y0,x1,y1,x){
	return y0+(y1-y0)*(x-x0)/(x1-x0);
    }
 
    // Assign colors for each vertex
    material.vertexColors = THREE.VertexColors;
    for ( var i = 0; i < nfaces; i++ )
    {
        var id = faces[i];
	//各頂点の色のスカラー値
	//x
	var S0  = scalars[ (id[0]-0.1)/0.7*255];
	var S1  = scalars[ (id[1]-0.1)/0.7*255];
	var S2  = scalars[ (id[2]-0.1)/0.7*255];
	//c:x0,f:x1
	var S0c = Math.ceil(S0);
	var S0f = S0c+1;
	var S1c = Math.ceil(S1);
	var S1f = S1c+1;
	var S2c = Math.ceil(S2);
	var S2f = S2c+1;
	//c:y0,f:y1
	var C0c = new THREE.Color().setHex( cmap[ S0c ][1] );
        var C1c = new THREE.Color().setHex( cmap[ S1c ][1] );
        var C2c = new THREE.Color().setHex( cmap[ S2c ][1] );
	var C0f = new THREE.Color().setHex( cmap[ S0f ][1] );
        var C1f = new THREE.Color().setHex( cmap[ S1f ][1] );
        var C2f = new THREE.Color().setHex( cmap[ S2f ][1] );
	
	//function lerp(x0,y0,x1,y1,x){
	//	return y0+(y1-y0)*(x-x0)/(x1-x0);
	//    }
	
	//y
	var C0 = new THREE.Color().setHex(lerp(S0c,C0c,S0f,C0f,S0));
	var C1 = new THREE.Color().setHex(lerp(S1c,C1c,S1f,C1f,S1));
	var C2 = new THREE.Color().setHex(lerp(S2c,C2c,S2f,C2f,S2));
	
        geometry.faces[i].vertexColors.push( C0 );
        geometry.faces[i].vertexColors.push( C1 );
        geometry.faces[i].vertexColors.push( C2 );
    }
    
    var triangle = new THREE.Mesh( geometry, material );
    scene.add( triangle );
    
    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        renderer.render( scene, camera );
    }
}
