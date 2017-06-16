function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();
   
    screen.init( volume, {
	width: window.innerWidth * 0.8,
	height: window.innerHeight,
	targetDom: document.getElementById('display'),
	enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    // var isovalue = 128;
    var point = new THREE.Vector3(60,60,17);
    var normal = new THREE.Vector3(0,0,1);
    var surfaces = SlicePlane( volume, point, normal );
    screen.scene.add( surfaces );
    
    var x;
    var y;
    var z;
    
    document.getElementById('x').addEventListener('mousemove',function(){
	x=document.getElementById('x').value;
	document.getElementById('labelx').innerHTML="x:"+x;
    });
     document.getElementById('y').addEventListener('mousemove',function(){
	y=document.getElementById('y').value;
	document.getElementById('labely').innerHTML="y:"+y;
     });
     document.getElementById('z').addEventListener('mousemove',function(){
	z=document.getElementById('z').value;
	document.getElementById('labelz').innerHTML="z:"+z;
    });
    
    document.getElementById('xyz').addEventListener('click',function(){
	screen.scene.remove(surfaces);
	x=document.getElementById('x').value;
	y=document.getElementById('y').value;
	z=document.getElementById('z').value;
	console.log(x);
	console.log(y);
	console.log(z);
	var normal =  new THREE.Vector3(x,y,z);
	surfaces = SlicePlane( volume, point, normal );
	screen.scene.add( surfaces );
    });
    
    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });
    
    window.addEventListener( 'resize', function() {
	screen.resize([ window.innerWidth * 0.8, window.innerHeight ]);
    });
    
    screen.loop();
}

function refresh() {
    window.location.reload();
}
