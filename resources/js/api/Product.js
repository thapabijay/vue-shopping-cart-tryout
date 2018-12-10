import axios from 'axios';

export default{    
    getProducts(params) {
        return new Promise((resolve, reject) => {
            let resp= {data:[
                    {id:1,name:'product 1',description:'pr 1',amount:500,image_url:null},
                    {id:2,name:'product 2',description:'pr 2',amount:340,image_url:null},
                    {id:3,name:'product 3',description:'pr 3',amount:670,image_url:null},
                    {id:4,name:'product 4',description:'pr 4',amount:430,image_url:null},
                    {id:5,name:'product 5',description:'pr 5',amount:900,image_url:null},
                    {id:6,name:'product 6',description:'pr 6',amount:500,image_url:null},
                ]};
            resolve(resp);
        });
        //return axios.get("/api/products",{params});
    }
}