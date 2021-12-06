
class TreeClass{
    constructor(root) {
        this.root = root;
    };

    getRoot(){
        return this.root;
    };

    //encuentra el primer nodo que cumpla la condición
    findChildren(node, condition, action){
        if (condition(node)){
            action(node);
            return node;
        }
        else if(node.children === null) return null;
        else if(node.children.length <= 0) return null;
        else{
            var lista = [];
            for( let c of node.children){
              lista.push(this.findChildren(c, condition, action));
            }
            let v = lista.find(d => d !== null);
            return v;
        }
    }

    hideChildren(node){
        this.findChildren(this.root, (d)=>{return d.uid===node.uid}, (n) =>{
            if(n.children){
                let temp = n.children;
                n._children = temp;
                n.children = null;                
            }
            else{
                let temp = n._children;
                n.children = temp;
                n._children = null;
            }

        });
    }

    cleanTree(node){
        if(node === null){
            return;
        }
        else if(node.children === null || node.children.length === 0){
            return;
        }
        else{
            node.children = node.children.filter((d)=>(d.uid !== "delete"));
            for(let child of node.children){
                this.cleanTree(child);
            }
        }
    }

    deleteNode(node){
        this.findChildren(this.root,(d)=>{return d.uid===node.uid},(n)=>{
            n.uid = "delete";
        });
        this.cleanTree(this.root);

    }

    //devuelve los nodos en un nivel
    getNodesInLevel(fase,node){
        let rta = [];
        if (node.fase === fase){
            rta.push(node);
        }
        if(node.children !== null && node.children !== undefined && node.children.length >0){
            for(let n of node.children){
                let temprta = this.getNodesInLevel(fase,n);
                for(let item of temprta){
                    rta.push(item);
                }
            }
        }
        return rta;
    };

};

export default TreeClass;