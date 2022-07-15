import redbird  from "redbird"

let proxy = redbird({port:4600})

let register = (host)=>{
    proxy.register(`${host}/api`, `http://${host}:4000/api`);
    proxy.register(`${host}`, `http://${host}:3000/`);
}

register('localhost');
register("192.168.0.223");