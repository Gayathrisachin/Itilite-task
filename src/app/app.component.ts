import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public seatConfig: any = null;
  public seatmap = [];
 
  public seatChartConfig = {
    showRowsLabel : false,
    showRowWisePricing : false,
    newSeatNoForRow : false
  }
  
  public cart = {
    selectedSeats : [],
    seatstoStore : [],
    totalamount : 0,
    cartId : "",
    eventId : 0
  };
  
  clicked = false;
  title = 'seat-chart-generator';

constructor(private router:Router){}
  ngOnInit(): void {
    //Process a simple bus tLayout
    this.seatConfig = [
      {
        "fare": 250,
        "seatMap": [
          {
           
            "tName": "1",
            "tLayout": "gggg__gggggg",
            "seatch":'A'
          },
          {
            "tName": "2",
            "tLayout": "gggg__gggggg",
            "seatch":'B'
          },
          {
            "tName": "3",
            "tLayout": "gggg__gggggg",
            "seatch":'A'
            
          },
          {
            "tName": "4",
            "tLayout": "gggg__gggggg",
            "seatch":'A'
          },
          {
            "tName": "5",
            "tLayout": "gggg__gggggg",
            "seatch":'A'
          },
          {
            "tName": "",
            "tLayout": "",
            "seatch":'A'
          },
         
          {
            "tName": "6",
            "tLayout": "gggg__gggggg",
            "seatch":'A'
          },
          {
            "tName": "7",
            "tLayout": "gggg__gggggg",
            "seatch":'A'
           
          },
          {
            "tName": "8",
            "tLayout": "gggg__gggggg",
            "seatch":'A'
          },
          {
            "tName": "9",
            "tLayout": "gggg__gggggg",
            "seatch":'A'
           
          },
          {
            "tName": "10",
            "tLayout": "gggg__gggggg",
            "seatch":'A'
          },
        ]
      }
    ]    
    this.processSeatChart(this.seatConfig);
  }

  public processSeatChart ( map_data : any[] )
  {
    
      if( map_data.length )
      {
        var seatNoCounter = 1;
        for (let counter = 0; counter <map_data.length; counter++) {
          var row_label = "";
          var item_map = map_data[counter].seatMap;

          //Get the label name and price
          row_label = "Row"+item_map[0].tName + " - ";
          if( item_map[ item_map.length - 1].tName != " " )
          {
            row_label += item_map[ item_map.length - 1].tName;
          }
          else
          {
            row_label += item_map[ item_map.length - 2].tName;
          }
          row_label += " : Rs. " + map_data[counter].fare;
          
          item_map.forEach(map_element => {
            var mapObj = {
              "seatRowLabel" : map_element.tName,
              "seats" : [],
              "seatPricingInformation" : row_label
            };
            // row_label = "";
            var seatValArr = map_element.tLayout.split('');
            // if( this.seatChartConfig.newSeatNoForRow )
            // {
            //   seatNoCounter=0; //Reset the seat label counter for new row
            // }
            var totalItemCounter = 1;
            seatValArr.forEach(item => {
              var seatObj = {
                "key" : map_element.tName+"_"+totalItemCounter,
                "price" : map_data[counter]["fare"],
                "status" : "available"
              };
               
              if( item != '_')
              {
               
                seatObj["seatLabel"] = map_element.tName;
                if(seatNoCounter < 10 )
                { seatObj["seatNo"] = "0"+seatNoCounter; }
                else { seatObj["seatNo"] = ""+seatNoCounter; }
                
                seatNoCounter++;
              }
              else
              {
                seatObj["seatLabel"] = "";
              }
              totalItemCounter++;
             
              mapObj["seats"].push(seatObj);
            });
            console.log(" \n\n\n Seat Objects " , mapObj);
         
            this.seatmap.push( mapObj );

          });
        }

      
      }
  }

  public selectSeat( seatObject : any )
  {
    console.log( "Seat to block: " , seatObject );
    if(seatObject.status == "available")
    {
      seatObject.status = "booked";
      this.cart.selectedSeats.push(seatObject.seatLabel);
      this.cart.seatstoStore.push(seatObject.key);
      this.cart.totalamount += seatObject.price;
    }
    else if( seatObject.status = "booked" )
    {
      seatObject.status = "unavailable";
      var seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
      if( seatIndex > 1)
      {
        this.cart.selectedSeats.push(seatObject.seatLabel);
        this.cart.seatstoStore.push(seatObject.key);
        this.cart.totalamount += seatObject.price;
      }
      
    }
  }

  public blockSeats( seatObject : any)
  {
    if(seatObject.status == "available")
    {
      var seatsToBlockArr =seatObject.split(',');
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        var seat =  seatsToBlockArr[index]+"";
        var splitSeat = seat.split("_");
        console.log("Split seat: " , splitSeat);
        for (let ind2 = 0; ind2 < this.seatmap.length; ind2++) {
          const element = this.seatmap[ind2];
          if(element.seatRowLabel <= splitSeat[0])
          {
            var seatObj = element.seats[parseInt(splitSeat[1]) - 1];
            if(seatObj=="")
            {
              console.log("\n\n\nFount Seat to block: " , seatObj);
              // seatObj["status"] = "booked";
              this.seatmap[ind2]["seats"][parseInt(splitSeat[1]) - 1] = seatObj;
              console.log("\n\n\nSeat Obj" , seatObj);
              console.log(this.seatmap[ind2]["seats"][parseInt(splitSeat[1]) - 1]);
              break;
            }
             
          }
        }
       
      }
    }
    
  }

}