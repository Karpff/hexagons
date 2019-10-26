var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = innerWidth;
canvas.height = innerHeight;
var c = canvas.getContext('2d');

var size = 30;
c.lineWidth = 6;

function getDistance(x1,y1,x2,y2)
{
  return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}

function getDistanceFromCenter(x,y)
{
  return getDistance(x,y,canvas.width/2,canvas.height/2);
}

var maxDistance = parseInt(getDistanceFromCenter(0,0));

class Tripad
{
  constructor(x,y)
  {
    this.x = x;
    this.y = y;
    this.targetAngle = -90;
    this.angle = -90;
    this.cycle = 0;
    this.hue = 0;
    this.color = "hsl("+this.hue+",100%,50%)";
  }

  update()
  {
    this.cycle+=5;
    if(this.cycle>=0)
    {
      this.targetAngle+=60;
      this.cycle-=300;
    }
    if(this.angle<this.targetAngle)
    {
      this.angle+=3;
      this.hue+=3;
      this.color = "hsl("+this.hue+",100%,50%)";
    }
  }

  draw()
  {
    c.beginPath();
    c.moveTo(this.x,this.y);
    c.lineTo(this.x+Math.cos(this.angle/180*Math.PI)*size,this.y+Math.sin(this.angle/180*Math.PI)*size);
    c.moveTo(this.x,this.y);
    c.lineTo(this.x+Math.cos((this.angle+120)/180*Math.PI)*size,this.y+Math.sin((this.angle+120)/180*Math.PI)*size);
    c.moveTo(this.x,this.y);
    c.lineTo(this.x+Math.cos((this.angle+240)/180*Math.PI)*size,this.y+Math.sin((this.angle+240)/180*Math.PI)*size);
    c.strokeStyle = this.color;
    c.stroke();
  }
}

var tripads = [];
var horizontal = innerWidth/(size*1.8);
var vertical = innerHeight/(size*1.5);

for(let i=-horizontal/2-2;i<=horizontal/2+2;i++)
{
  for(let j=-vertical/2-2;j<=vertical/2+2;j++)
  {
    tripads.push(new Tripad(i*size*1.7+j%2*size*0.85+canvas.width/2,j*size*1.4+canvas.height/2));
    tripads[tripads.length-1].cycle = -parseInt(getDistanceFromCenter(tripads[tripads.length-1].x,tripads[tripads.length-1].y));
  }
}

function animate()
{
  c.fillRect(0,0,canvas.width,canvas.height);
  for(let i=0;i<tripads.length;i++)
  {
    tripads[i].update();
    tripads[i].draw();
  }
  window.requestAnimationFrame(animate);
}
animate();
