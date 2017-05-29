function Isosurfaces( volume, isovalue )
{
    var geometry = new THREE.Geometry();
    var material = new THREE.MeshLambertMaterial();

    var smin = volume.min_value;
    var smax = volume.max_value;

    //Threshold
    isovalue = KVS.Clamp( isovalue, smin, smax );

    var lut = new KVS.MarchingCubesTable();
    var cell_index = 0;
    var counter = 0;

    
    for ( var z = 0; z < volume.resolution.z - 1; z++ )
    {
        for ( var y = 0; y < volume.resolution.y - 1; y++ )
        {
            for ( var x = 0; x < volume.resolution.x - 1; x++ )
            {
		
                var indices = cell_node_indices( cell_index++ );
                var index = table_index( indices );
                if ( index == 0 ) { continue; }
                if ( index == 255 ) { continue; }

                for ( var j = 0; lut.edgeID[index][j] != -1; j += 3 )
                {
                    var eid0 = lut.edgeID[index][j];
                    var eid1 = lut.edgeID[index][j+2];
                    var eid2 = lut.edgeID[index][j+1];

                    var vid0 = lut.vertexID[eid0][0];
                    var vid1 = lut.vertexID[eid0][1];
                    var vid2 = lut.vertexID[eid1][0];
                    var vid3 = lut.vertexID[eid1][1];
                    var vid4 = lut.vertexID[eid2][0];
                    var vid5 = lut.vertexID[eid2][1];

                    var v0 = new THREE.Vector3( x + vid0[0], y + vid0[1], z + vid0[2] );
                    var v1 = new THREE.Vector3( x + vid1[0], y + vid1[1], z + vid1[2] );
                    var v2 = new THREE.Vector3( x + vid2[0], y + vid2[1], z + vid2[2] );
                    var v3 = new THREE.Vector3( x + vid3[0], y + vid3[1], z + vid3[2] );
                    var v4 = new THREE.Vector3( x + vid4[0], y + vid4[1], z + vid4[2] );
                    var v5 = new THREE.Vector3( x + vid5[0], y + vid5[1], z + vid5[2] );

                    var v01 = interpolated_vertex( v0, v1, isovalue );
                    var v23 = interpolated_vertex( v2, v3, isovalue );
                    var v45 = interpolated_vertex( v4, v5, isovalue );

                    geometry.vertices.push( v01 );
                    geometry.vertices.push( v23 );
                    geometry.vertices.push( v45 );

                    var id0 = counter++;
                    var id1 = counter++;
                    var id2 = counter++;
                    geometry.faces.push( new THREE.Face3( id0, id1, id2 ) );
                }
            }
            cell_index++;
        }
        cell_index += volume.resolution.x;
    }

    geometry.computeVertexNormals();

    //task1
    //<<<<<<<<<< add >>>>>>>>>>>>>
    //Create color map
    var cmap = [];
    var RESOLUTION = 256;
    
    for ( var i = 0; i < RESOLUTION ; i++ )
    {	
        var S = i/(RESOLUTION-1); // [0,1]
        var R = Math.max( Math.cos( ( S - 1.0 ) * Math.PI ), 0.0 );
        var G = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
        var B = Math.max( Math.cos( S * Math.PI ), 0.0 );
        var color = new THREE.Color( R, G, B );

        cmap.push( [ S, '0x' + color.getHexString() ] );
    }
    
    
    material.color = new THREE.Color().setHex(cmap[isovalue][1]);
     //<<<<<<<<<< /add >>>>>>>>>>>>>

    
    return new THREE.Mesh( geometry, material );


    function cell_node_indices( cell_index )
    {
        var lines = volume.resolution.x;
        var slices = volume.resolution.x * volume.resolution.y;

        var id0 = cell_index;
        var id1 = id0 + 1;
        var id2 = id1 + lines;
        var id3 = id0 + lines;
        var id4 = id0 + slices;
        var id5 = id1 + slices;
        var id6 = id2 + slices;
        var id7 = id3 + slices;

        return [ id0, id1, id2, id3, id4, id5, id6, id7 ];
    }

    function table_index( x, y, z )
            {
                var s0 = plane_function( x,     y,     z     );
                var s1 = plane_function( x + 1, y,     z     );
                var s2 = plane_function( x + 1, y + 1, z     );
                var s3 = plane_function( x,     y + 1, z     );
                var s4 = plane_function( x,     y,     z + 1 );
                var s5 = plane_function( x + 1, y,     z + 1 );
                var s6 = plane_function( x + 1, y + 1, z + 1 );
                var s7 = plane_function( x,     y + 1, z + 1 );

                var index = 0;
                if ( s0 > 0 ) { index |=   1; }
                if ( s1 > 0 ) { index |=   2; }
                if ( s2 > 0 ) { index |=   4; }
                if ( s3 > 0 ) { index |=   8; }
                if ( s4 > 0 ) { index |=  16; }
                if ( s5 > 0 ) { index |=  32; }
                if ( s6 > 0 ) { index |=  64; }
                if ( s7 > 0 ) { index |= 128; }

                return index;
            }
    
    function interpolated_vertex( v0, v1, s )
    {
	var i0 = v0.x + (v0.y* volume.resolution.x) + (v0.z*volume.resolution.x * volume.resolution.y);
	var i1 = v1.x + (v1.y* volume.resolution.x) + (v1.z*volume.resolution.x * volume.resolution.y);

	var s0 = volume.values[i0][0];
	var s1 = volume.values[i1][0];
	
	var t = (s-s0)/(s1-s0);
	//harf
        //return new THREE.Vector3().addVectors( v0, v1 ).divideScalar( 2 );
	return new THREE.Vector3().addVectors(v0.multiplyScalar(1-t),v1.multiplyScalar(t));
	
    }

    var coef = new KVS.Vec4();

    function setPlane()
    {
        if ( arguments.length == 4 )
        {
            var a = arguments[0];
            var b = arguments[1];
            var c = arguments[2];
            var d = arguments[3];
            coef = KVS.Vec4(a,b,c,d);
        }
        else if ( arguments.length == 2 )
        {
            var point = arguments[0];
            var normal = arguments[1];
            var w = point.clone().mulScalar( -1 ).dot( normal );
	    coef = new KVS.Vec4( normal.x, normal.y, normal.z, w );
        }
    }

    function plane_function( x, y, z )
    {
        return coef.x * x + coef.y * y + coef.z * z + coef.w;
    }
    
}
