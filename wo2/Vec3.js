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
