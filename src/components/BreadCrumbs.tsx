import * as React from "react";

const BreadCrumbs = (props:any) => {
  const { name, parents, baseUrl } = props;
  var breadcrumbs;
  if (parents) {
    parents[0].name = "Home";
    parents.forEach((e:any) => {
        if (e.meta.entityType.id == "ce_state") {
          e.name = e.c_addressRegionDisplayName;
        }
      }
    );
  
    breadcrumbs = parents.map((crumb:any) => (
      <div className="space-x-2">
        <a className="font-bold hover:underline" href={baseUrl + crumb.slug}>{crumb.name}</a>
        <span>{'>'}</span>
      </div>
    ));
  }

  return (
    <div className="section flex gap-x-2">
      {breadcrumbs}
      {name}
    </div>
  );
};

export default BreadCrumbs;
