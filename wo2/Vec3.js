// Constructor
Vec3 = function( x, y, z )
{
    this.x = x;
    this.y = y;
    this.z = z;
}

Vec3.prototype.max=function()
{
    var max=0;
    
    if(this.x>this.y)
    {
	max=this.x;
    }
    else
    {
	max=this.y;
    }
    if(this.z>max)
    {
	max=this.z;
    }
    return max;
}

Vec3.prototype.min=function()
{
    var min=0;
    if(this.x>this.y)
    {
	min=this.y;
    }
    else
    {
	min=this.x;
    }
    if(min>this.z)
    {
	min=this.z;
    }
    return min;
}

Vec3.prototype.mid=function()
{
    var mid=0;
    var sum=0;
    sum=this.x+this.y+this.z;
    mid=sum-this.max()-this.min();
    return mid;
}



Vec3.prototype.minus = function(v)

{

    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;

return this;

}

function CrossProduct(u,v)
{

    var a = new Vec3(u.y*v.z-u.z*v.y, u.z*v.x-u.x*v.z, u.x*v.y-u.y*v.x)   
    return a;

}

function Length(a)
{
    var length=0;
    length=Math.pow(a.x,2)+Math.pow(a.y,2)+Math.pow(a.z,2);
    length=Math.sqrt(length);
    return length;
}

function AreaOFTriangle(v0,v1,v2)
{
    var u=new Vec3();
    var v=new Vec3();
    u=v1.minus(v0); v=v2.minus(v0);
    var a=new Vec3();
    a=CrossProduct(u,v);
    var length=Length(a);
    var Area=length/2;
    return Area;
}
