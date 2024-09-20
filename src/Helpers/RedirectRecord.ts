// // @ts-ignore
declare const Xrm: any;
// function redirectToRecord(id) {
//     if (typeof Xrm !== 'undefined' && Xrm.Navigation) {
//       var recordId = id; 
//       var entityName = "avpx_servicejob";
//       var url = Xrm.Navigation.openForm({
//         entityName: entityName,
//         entityId: recordId
//       });
//       Xrm.Navigation.openForm(url).then(
//         function (success) {
//           console.log('Form opened successfully');
//         },
//         function (error) {
//           console.log('Error opening form: ' + error.message);
//         }
//       );
//     } else {
//       console.error('Xrm object is not available.');
//     }
//   }
export function redirectToRecord(id: string): void {
  if (typeof Xrm !== 'undefined' && Xrm.Navigation) {
    const recordId: string = id;
    const entityName: string = "avpx_servicejob";
    const url: string = Xrm.Navigation.openForm({
      entityName: entityName,
      entityId: recordId
    });
    Xrm.Navigation.openForm(url).then(
      function () {
        console.log('Form opened successfully');
      },
      function (error: any) {
        console.log('Error opening form: ' + error.message);
      }
    );
  } else {
    console.error('Xrm object is not available.');
  }
}