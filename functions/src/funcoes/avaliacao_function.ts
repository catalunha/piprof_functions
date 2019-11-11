import DatabaseReferences from "../database-references";

export function iniciarOnUpdate(snap: any) {

  let data = snap.data()
  let id = snap.id

  if (data.aplicar) {
    return aplicarAvaliacao()
  }else{
    return 0;
  }

}

export function aplicarAvaliacao(){
  
}