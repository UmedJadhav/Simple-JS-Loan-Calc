const UIresults = document.getElementById('results');
const UIloading = document.getElementById('loading');

document.getElementById('loan-form').addEventListener('submit',function(e){
    UIresults.style.display = 'none';
    UIloading.style.display ='block';
    setTimeout(calculateResults(e),2000);
    e.preventDefault();
});

function calculateResults(e){
    const UIamount = document.getElementById('amount');
    const UIinterest = document.getElementById('interest');
    const UIyears = document.getElementById('years');
    const UImonthlyPayment = document.getElementById('monthly-payment');
    const UItotalPayment = document.getElementById('total-payment');
    const UItotalInterest = document.getElementById('total-interest');

    const principle = parseFloat(UIamount.value);
    const calculatedInterest = parseFloat(UIinterest.value)/100/12;
    const calculatedPayments = parseFloat(UIyears.value)*12;

    const x = Math.pow(1 + calculatedInterest,calculatedPayments);
    const monthly = (principle*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        UIresults.style.display = 'block';
        UIloading.style.display = 'none';
        UImonthlyPayment.value = monthly.toFixed(2);
        UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
        UItotalInterest.value = ((monthly*calculatedPayments) - principle).toFixed(2);
    }else{
        showError('Check the amount Entered');
    }
    e.preventDefault();
}

function showError(error){
    UIloading.style.display = 'none';
    UIresults.style.display = 'none';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    card.insertBefore(errorDiv,heading); 
    setTimeout(function(){
       document.querySelector('.alert').remove(); 
    },3000);
}
