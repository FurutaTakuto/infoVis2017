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



/*Vec3.prototype.minus = function(v)

{

this.x=v.x-this.x;

this.y=v.y-this.y;

this.z=v.z-this.z;

return this;

}

Vec3.prototype.CrossProduct = function(v)
{
    this.x=v.y*this.z-this.y*v.z;
    this.y=v.z*this.x-this.z*v.x;
    this.z=v.x*this.y-this.x*v.y;
    return this;
}

Vec3.prototype.Length=function();
{
    var length=0;
    length=Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2);
    length=Math.pow(length,1/2);
    return length;
}

Vec3.prototype.AreaOFTriangle()=function(v0,v1,v2)
{
    var length=0;
    var CP=new Vec3();
    var Area=0;
    v1=v1.minus(v0);
    v2=v2.minus(v0);
    CP=v1.CrossProduct(v2);
    length=CP.Length();
    Area=length/2;
    return Area;
}*/
