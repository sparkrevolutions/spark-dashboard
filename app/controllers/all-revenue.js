import Ember from 'ember';

export default Ember.Controller.extend({
  revenue: {
    currentTarget: "",
    currentRevenue: "",
    dateCreated: "",
    remaining: "",
    },
  invoiced: {
    getInvoiceMonth: function(){
      var target = moment(this.get('invoiceTimeCreated'));
      return target.format('MMMM');
    }.property('invoiceTimeCreated'),
    
    invoiceTimeCreated: DS.attr('string')
  },
  
  inv:"",
  lead:"",
  clienthold: "",
  revenue: "",
  users: "",
  isEditMode: false,
  isRevenueEditMode: false,
	getRevenue: function() {
		this.set('revenue', this.store.find('revenue'));	
	},
  checkEditMode: function() {
    var newRevenue = this.store.find('revenue');
    if(newRevenue.get('currentTarget') > 0 && newRevenue.get('invoiced') > 0)
    {
      newRevenue.set('isRevenueEditMode', false);
    }
    else {
      newRevenue.set('isRevenueEditMode', true);
    }
  },
  actions: {
    deleteInvoice: function(inv) {
      if(confirm("Are you sure you want to remove client " + inv.get('invoiceName') + "?")){
        inv.deleteRecord();
        inv.save();
      }
    },
  editInvoice: function(inv) {
    inv.set('isEditInvoice', true);
  
  },
  setEditInvoice: function(inv) {
    if(inv.get('invoiceName') === "") {
      alert('Error: You have left the textbox empty!');
    }
      else {  
      if(inv.get('invoiceAmount') > 0) {
          this.set('invoiced.invoiceName', 'inv.invoiceName');
          this.set('invoiced.invoiceAmount', 'inv.invoiceAmount');
          inv.set('isEditInvoice', false);
          inv.save();
        }
        else {
          alert('Error: Invoice Amount is not correct!');
        }
      }
  },
	editRevenue: function() {
    var currentRevenue = this.get('revenue');
		currentRevenue.set('isRevenueEditMode', true);
	}, 
	addRevenue: function() {
    var currentRevenue = this.get('revenue');
    if (this.get('revenue.currentTarget') > 0 && this.get('revenue.invoiced') > 0)
    {
      currentRevenue.set('dateCreated', new Date());
      currentRevenue.set('isRevenueEditMode', false);
      currentRevenue.save();
  		}
    else {
      currentRevenue.set('dateCreated', new Date());
      currentRevenue.set('isRevenueEditMode', true);
      currentRevenue.save();
      alert('You must enter a correct Target / Invoice Amount!');    
    }
  },
  
  deleteClientHold: function(clienthold) {
	  if(confirm("Are you sure you want to remove this?")){
		  clienthold.deleteRecord();
		  clienthold.save();
	  }
  },
  
  deleteHotLead: function(lead) {
     if(confirm("Are you sure you want to remove Hot Lead " + lead.get('hotLeadName') + "?")){
       lead.deleteRecord();
       lead.save();
     }
  },
  editHotLead: function(lead) {
      lead.set('isEditHotLead', true);
  },
  setHotLead: function(lead) {
    if(lead.get('hotLeadName') === "") {
      alert('Error: You have left the textbox empty!');
    }
    else {
      this.set('hotlead.hotLeadName', 'lead.hotLeadName');
      lead.save();
      lead.set('isEditHotLead', false);
    }
  },
  } 
});
