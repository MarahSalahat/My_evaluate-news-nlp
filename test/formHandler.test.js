import { handleSubmit, postData } from '../src/client/js/formHandler';

jest.mock('../src/client/js/formHandler', () => ({
    ...jest.requireActual('../src/client/js/formHandler'),
    postData: jest.fn()
}));

beforeAll(() => {
    global.alert = jest.fn(); 
});

beforeEach(() => {
    document.body.innerHTML = `
        <div id="polarity"></div>
        <div id="agreement"></div>
        <div id="subjectivity"></div>
        <div id="confidence"></div>
        <div id="irony"></div>
        <form id="form">
            <input id="url" value="http://example.com"/>
        </form>
    `;

    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({
                score_tag: 'P',
                agreement: 'AGREEMENT',
                subjectivity: 'SUBJECTIVE',
                confidence: 'HIGH',
                irony: 'IRONIC'
            })
        })
    );

    postData.mockResolvedValue({
        score_tag: 'P',
        agreement: 'AGREEMENT',
        subjectivity: 'SUBJECTIVE',
        confidence: 'HIGH',
        irony: 'IRONIC'
    });
});

test("Testing the handleSubmit() function", async () => {

    const preventDefault = jest.fn();

   
    await handleSubmit({ preventDefault });

    // wait for DOM updates
    await new Promise((r) => setTimeout(r, 100)); 

    
    expect(preventDefault).toHaveBeenCalled();
    expect(document.getElementById("polarity").innerHTML).toBe('Polarity: P');
    expect(document.getElementById("agreement").innerHTML).toBe('Agreement: AGREEMENT');
    expect(document.getElementById("subjectivity").innerHTML).toBe('Subjectivity: SUBJECTIVE');
    expect(document.getElementById("confidence").innerHTML).toBe('Confidence: HIGH');
    expect(document.getElementById("irony").innerHTML).toBe('Irony: IRONIC');
});

afterEach(() => {
    jest.restoreAllMocks();
});
