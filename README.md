Classic ASP + TypeScript sample application
===========================================

Inspired by [this post].

This is a sample application developed with classic asp and typescript.

But why
-------

![butwhy.gif](https://media.giphy.com/media/1M9fmo1WAFVK0/giphy.gif)

Sometimes we're simply stuck with old applications running in classic asp.

TypeScript adds usefull tools for development like IntelliSense, refactoring, a real class system, a type system, compile time errors, autocompletion, jsdocs, and more.

It can be used in existing applications, sharing code and session state.

Also, it was fun to do :)

Run the project
---------------

To fetch the js and css packages from nuget, run the command `Update-Package -Reinstall` from the package manager console.

The package handlebars.TypeScript.DefinitelyTyped installs two .d.ts files, it is necessary to delete the one for version 1.0.0.

It runs on IIS Express, it can be executed directly from visual studio (without debug).

Script execution order
----------------------

Scripts run in classic asp in the following order:

1. any `<script runat="server">` tags that **do not** match the default language;
2. the default script (inside `<% %>`);
3. any `<script runat="server">` tags that **do** match the default language.

To be able to execute `main()` function after the included scripts, the current default language was kept as VBScript with the directive `<%@ language="VBScript" %>`.

One option to use typescript with asp would be to add a step to the build process that enclosures the content in asp tags and changes the extension to .asp.

[Source][script exection order]

Configuration
-------------

Some important configurations for typescript when targeting classic asp:

```javascript
{
    "compilerOptions": {
        "target": "es3",
        "lib": ["es5", "scripthost"],
        "module": "none"
    }
}
```

ASP can run either with VBScript or JScript, which is Microsoft's version of javascript, and it's compliant to the ECMAScript 3 specification.

The default type libs that typescript uses include new browser apis that define a Request and a Response object, so we have to define the libs we want to use to be able to define these objects with ASP's api.

Finally, asp has no support for any of the possible module outputs.

Hiding asp sources
------------------

The generated server-side code will have .js extension, which IIS normally sends to the client. To hide asp's sources, we can add the following configuration:

```xml
<!-- IIS 7+ -->
<system.webServer>
<security>
  <requestFiltering>
    <hiddenSegments>
      <add segment="src" />
    </hiddenSegments>
  </requestFiltering>
</security>
</system.webServer>
```

This configuration does not work for IIS 6 or lower.

Routing
-------

For this application, instead of using diferent .asp files including the necessary js sources, a mvc workflow was used with a single entry point, Default.asp, routing with QueryString parameters.

Another option would be to redirect 404 errors to an asp file, which does the routing reading the attempted path.

Session and Application state
-----------------------------

The syntax classic asp uses for setting session ou application state is not supported by typescript:

```vbscript-html
<%
Session("user_id") = 1
Application("connectionstring") = "some string"
%>
```

The alternative would be to define a function to set these and declare the interface in typescript. E.g.:

```javascript
function setSession(key, val) {
    Session(key) = val;
}
```

Then in typescript:

```typescript
declare function setSession(key: string, val: any): void;
```

Error handling
--------------

Unfortunately, JScript's Error object does not define the stack property, so there is no easy way to build a stacktrace, since object's methods are emitted as anonymous functions by typescript.

Third-party libraries
---------------------

This application uses Handlebars for templating and Moment.js for handling dates. Both have a UMD (Universal Module Definition) structure, which is not compatible with classic asp, as the global object does not exist.

In classic asp JScript, a variable in a closure is "exported" to the global scope if it is defined without being declared. E.g.:

```javascript
(function() {
    var localFn = function() {
        // ...
    };
    
    // classic asp export
    // this makes globalFn available in the global scope
    globalFn = localFn;
});
```

Because of this behaviour, it is necessary to replace the UMD checks in both libraries with this "exporting" syntax.

Note that only libraries that are not dependent to the DOM will work.

   [this post]: <http://luizcarlosfaria.net/blog/typescript-classicasp-why-not/>
   [script exection order]: <https://stackoverflow.com/questions/1447822/whats-the-difference-between-and-script-language-vbscript-runat-serve>
