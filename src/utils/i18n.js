
export function generateTitle(title) {
    const hasKey = this.$te('route.' + title)
    
    if (hasKey) {
      // $t :this method from vue-i18n, inject in @/lang/index.js
      const translatedTitle = this.$t('route.' + title)
  
      return translatedTitle
    }
    return title
  }


  export function generateInfoTableTh(title){
    const hasKey =this.$te('infoTable.'+title)
    if(hasKey){
    
        return this.$te('infoTable.'+title)
    }
    
    return title
  }